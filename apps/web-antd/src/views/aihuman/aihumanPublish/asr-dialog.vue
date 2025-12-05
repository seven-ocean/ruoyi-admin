<template>
  <BasicDrawer :close-on-click-modal="false" title="语音交互" class="w-[450px]">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <a-button
          type="primary"
          @pointerdown.stop.prevent="startHold"
          @pointerup.stop.prevent="stopHold"
          @mouseleave="stopIfHolding"
        >
          <template #icon>
            <a-icon type="ion--mic-outline" />
          </template>
          长按录音，松开识别
        </a-button>
        <span v-if="recording" class="text-red-500">录音中…</span>
      </div>
      <a-divider />
      <div>
        <div class="font-medium mb-1">识别结果</div>
        <div class="p-2 border rounded min-h-[220px] max-h-[280px] overflow-auto break-words">
          <JsonPreview v-if="asrData" class="break-normal" :data="asrData" />
          <div v-else>{{ asrResult || '—' }}</div>
        </div>
      </div>
    </div>
  </BasicDrawer>
</template>

<script setup lang="ts">
import { useVbenDrawer, JsonPreview } from '@vben/common-ui'
import { aihumanConfigAsrFile } from '#/api/aihuman/aihumanConfig'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const [BasicDrawer, drawerApi] = useVbenDrawer({
  async onOpenChange(isOpen) {
    if (!isOpen) return
    const { id, autoStart } = drawerApi.getData() as { id?: number | string; autoStart?: boolean }
    targetId.value = id as number
    if (autoStart) {
      await startHold()
    }
  },
})

const targetId = ref<number>(0)
const asrResult = ref<string>('')
const asrData = ref<any>(null)
const recording = ref(false)
let audioCtx: AudioContext | null = null
let source: MediaStreamAudioSourceNode | null = null
let processor: ScriptProcessorNode | null = null
let inputSampleRate = 48000
let recordedChunks: Float32Array[] = []
let totalSamples = 0
let currentStream: MediaStream | null = null

async function startHold() {
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    inputSampleRate = audioCtx.sampleRate || 48000
    source = audioCtx.createMediaStreamSource(currentStream)
    processor = audioCtx.createScriptProcessor(4096, 1, 1)
    recordedChunks = []
    totalSamples = 0
    processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0)
      recordedChunks.push(new Float32Array(input))
      totalSamples += input.length
    }
    source.connect(processor)
    processor.connect(audioCtx.destination)
    recording.value = true
  } catch (err) {}
}

async function stopHold() {
  if (!recording.value) return
  recording.value = false
  try {
    if (processor) processor.disconnect()
    if (source) source.disconnect()
    if (audioCtx) await audioCtx.close()
    if (currentStream) currentStream.getTracks().forEach((t) => t.stop())
    if (!totalSamples) return
    const merged = mergeFloat32(recordedChunks, totalSamples)
    const pcm16 = downsampleTo16kPCM16(merged, inputSampleRate)
    const wavBlob = encodeWAV(pcm16, 16000)
    await submitWav(wavBlob)
  } catch (err) {}
}

function stopIfHolding() {
  if (recording.value) stopHold()
}

async function submitWav(wavBlob: Blob) {
  try {
    const file = new File([wavBlob], 'voice.wav', { type: 'audio/wav' })
    const resp = await aihumanConfigAsrFile(targetId.value, file)
    if (typeof resp === 'string') {
      try {
        asrData.value = JSON.parse(resp)
      } catch {
        asrResult.value = resp
        asrData.value = null
      }
    } else {
      asrData.value = resp
      asrResult.value = ''
    }
  } catch (err) {}
}

function mergeFloat32(list: Float32Array[], totalLength: number): Float32Array {
  const result = new Float32Array(totalLength)
  let offset = 0
  for (const chunk of list) {
    result.set(chunk, offset)
    offset += chunk.length
  }
  return result
}

function downsampleTo16kPCM16(buffer: Float32Array, sampleRate: number): Int16Array {
  const ratio = sampleRate / 16000
  const newLength = Math.round(buffer.length / ratio)
  const result = new Int16Array(newLength)
  let offsetResult = 0
  let offsetBuffer = 0
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio)
    let accum = 0
    let count = 0
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i]
      count++
    }
    const sample = accum / (count || 1)
    result[offsetResult] = Math.max(-1, Math.min(1, sample)) * 0x7fff
    offsetResult++
    offsetBuffer = nextOffsetBuffer
  }
  return result
}

function encodeWAV(pcm16: Int16Array, sampleRate: number): Blob {
  const dataSize = pcm16.length * 2
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)
  function writeStr(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }
  writeStr(0, 'RIFF')
  view.setUint32(4, 36 + dataSize, true)
  writeStr(8, 'WAVE')
  writeStr(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeStr(36, 'data')
  view.setUint32(40, dataSize, true)
  let offset = 44
  for (let i = 0; i < pcm16.length; i++, offset += 2) {
    view.setInt16(offset, pcm16[i], true)
  }
  return new Blob([view], { type: 'audio/wav' })
}
</script>
function handleExternalStop() { stopHold() }
onMounted(() => { window.addEventListener('publish-asr-stop', handleExternalStop) })
onBeforeUnmount(() => { window.removeEventListener('publish-asr-stop', handleExternalStop) })

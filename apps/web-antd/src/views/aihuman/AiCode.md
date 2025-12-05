

# 接下来的任务
在aihuman继续迭代功能

## 要求
1、要符合这个工程文件的目录结构和代码规范
2、要在这个工程文件的基础上继续迭代，不能完全重新开始

## 调整功能
### model调整
1、aihumanActionPreset-modal.vue、aihumanConfig-modal.vue、aihumanKeyword-modal.vue、aihumanRealConfig-modal.vue 调整成 Drawer 抽屉，然后打开时从右往左开




# 接下来的任务
在aihuman继续迭代功能

## 要求
1、要符合这个工程文件的目录结构和代码规范
2、要在这个工程文件的基础上继续迭代，不能完全重新开始

## 调整功能
### 已知后端的api路由都在/api/aihuman/*/index.ts 和 /api/aihuman/*/types.ts 追加
目前已经有这些接口
- 获取动作预设列表
  - `curl -X GET "http://localhost:6039/aihuman/aihumanActionPreset/list?pageNum=1&pageSize=10" -H "Authorization: Bearer <token>"`
- 新增动作预设
  - `curl -X POST "http://localhost:6039/aihuman/aihumanActionPreset" -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d "{\"actionCode\":\"wave_hand\",\"name\":\"挥手动作\",\"status\":\"0\"}"`
- 根据动作ID获取关键词列表
  - `curl -X GET "http://localhost:6039/aihuman/aihumanKeyword/listByAction/1" -H "Authorization: Bearer <token>"`
- 根据动作编码获取关键词列表
  - `curl -X GET "http://localhost:6039/aihuman/aihumanKeyword/listByActionCode/wave_hand" -H "Authorization: Bearer <token>"`
- 新增关键词并关联动作（通过动作编码自动补全ID）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanKeyword" -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d "{\"keyword\":\"挥手\",\"type\":\"3\",\"matchMode\":\"0\",\"priority\":80,\"status\":\"0\",\"publish\":\"1\",\"actionCode\":\"wave_hand\"}"`
- 删除动作预设（若存在关联关键词将被拒绝）
  - `curl -X DELETE "http://localhost:6039/aihuman/aihumanActionPreset/1" -H "Authorization: Bearer <token>"`
检查下有哪些没有追加，是否有遗漏，需要按照原有代码的目录结构和代码规范追加

### 关键词管理 页面 左侧是 关键词管理，右侧是 动作预设管理
1、 aihuman_keyword 是 aihuman_action_preset 的子表，aihuman_keyword 的 action_id，action_code 对应 aihuman_action_preset 的 id，action_code
2、 aihuman_action_preset 和 aihuman_keyword 的逻辑就像 sys_dict_type 和 sys_dict_data 的逻辑
3、 针对上述情况，增加前端代码
4、 需要好好参考下 system/dict/type 和 system/dict/data 模块的代码的实现，来调整 aihumanActionPreset 模块的代码




# 接下来的任务
在aihuman继续迭代功能

## 要求
1、要符合这个工程文件的目录结构和代码规范
2、要在这个工程文件的基础上继续迭代，不能完全重新开始

## 调整功能
### keyword-panel.vue 新增记录的窗口调整
1、需要增加动作选择器，选项为 动作列表 中的动作名称，数据需要从 动作列表 中获取
2、选择动作名称后，需要自动补全表单中的 action_id 和 action_code 字段
3、当动作列表筛选具体出具体的关键词后，需要自动筛选出关键词列表中的关键词，且关键词列表新增记录窗口，需要自动补全 action_id 和 action_code 字段



# 接下来的任务
在aihuman继续迭代功能

## 要求
1、要符合这个工程文件的目录结构和代码规范
2、要在这个工程文件的基础上继续迭代，不能完全重新开始

## 调整功能
### ActionPresetPanel 增加 ASR 触发按钮，我会在前端列表的每行数据增加一个按钮，按钮文字为 "ASR 识别"，点进去有一个小窗口，长按按钮就能输入语音，松开按钮语音输入结束，随后会调用 ASR 接口，用于触发 ASR 识别
1、这个是后端已有的接口：
- 调用 ASR 识别（上传音频文件，按动作ID）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanActionPreset/asr/1" -H "Authorization: Bearer <token>" -F "audio=@voice.pcm"`
- 调用 ASR 识别（上传 Base64 音频，按动作ID）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanActionPreset/asr/1" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer <token>" -d "audioBase64=$(base64 -w0 voice.pcm)"`
- 获取关键词列表（按动作编码）
  - `curl -X GET "http://localhost:6039/aihuman/aihumanKeyword/listByActionCode/start_interaction" -H "Authorization: Bearer <token>"`
2、前端需要增加一个小窗口，用于输入语音，点下去有一个麦克风图标，长按图标就能输入语音，松开图标语音输入结束，随后会调用 ASR 接口，用于触发 ASR 识别。用于显示 ASR 识别结果，点下去有一个关闭按钮，点击关闭按钮会关闭窗口。用于显示关键词列表，点下去有一个关闭按钮，点击关闭按钮会关闭窗口


## 调整功能
### aihumanPublish 新增 语音交互 按钮
1、长按 语音交互 按钮，会打开一个小窗口展示ASR结果，结果示例：




# 接下来的任务
在aihuman继续迭代功能

## 要求
1、要符合这个工程文件的目录结构和代码规范
2、要在这个工程文件的基础上继续迭代，不能完全重新开始

## 调整功能
### aihumanPublish 新增 语音交互 按钮
1、长按 语音交互 按钮，会打开一个小窗口展示ASR结果
2、在小窗口中，展示ASR识别的结果，实时更新。展示识别到的关键词列表，展示识别到的动作

- 交互按钮接口（按配置ID上传音频文件）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanConfig/asr/5" -H "Authorization: Bearer <token>" -F "audio=@voice.wav"`
- 交互按钮接口（按配置ID上传 Base64 音频，Linux/macOS）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanConfig/asr/5" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer <token>" -d "audioBase64=$(base64 -w0 voice.wav)"`
- 交互按钮接口（按配置ID上传 Base64 音频，Windows PowerShell）
  - `$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("voice.wav"))`
  - `curl -X POST "http://localhost:6039/aihuman/aihumanConfig/asr/5" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer <token>" -d "audioBase64=$b64"`
- 返回示例（命中关键词并映射 Live2d 表达）
  - `{ "code":200, "msg":"success", "data": { "result":"开始了吗", "match_keyword":"开始", "match_action_code":"smile_action", "match_action_name":"微笑动作", "expression_name":"kaixin", "expression_platform":"live2d", "is_match":true } }`
- 未命中关键词
  - `{ "code":500, "msg":"未匹配到关键词", "data": {"result":"开始了吗", "match_keyword":"", "match_action_code":"", "match_action_name":"", "expression_name":"", "expression_platform":"", "is_match":false} }`

3、动作在识别后自动触发。
例如：ASR 匹配到的 AihumanActionPreset 动作参数为 smile_action，那么进一步再从 AihumanConfig 中的 actionParams 中取出 {"platform": "live2d", "Expressions": [{"Name": "kaixin", "action_code": "smile_action"}]}，根据 Name 调用前端的 playExpression("kaixin")

4、需要调用前端的 playExpression 方法，用于播放动作
5、需要对接上述后端接口





# 接下来的任务
在aihuman继续迭代功能

## 要求
1、要符合这个工程文件的目录结构和代码规范
2、要在这个工程文件的基础上继续迭代，不能完全重新开始

## 调整功能
### aihumanPublish 的 语音交互 按钮，所调用的接口会额外返回一个字段 motions_name

- 交互按钮接口（按配置ID上传音频文件）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanConfig/asr/5" -H "Authorization: Bearer <token>" -F "audio=@voice.wav"`
- 交互按钮接口（按配置ID上传 Base64 音频，Linux/macOS）
  - `curl -X POST "http://localhost:6039/aihuman/aihumanConfig/asr/5" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer <token>" -d "audioBase64=$(base64 -w0 voice.wav)"`
- 交互按钮接口（按配置ID上传 Base64 音频，Windows PowerShell）
  - `$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("voice.wav"))`
  - `curl -X POST "http://localhost:6039/aihuman/aihumanConfig/asr/5" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer <token>" -d "audioBase64=$b64"`
- 返回示例（命中关键词并映射 Live2d 表达/动作）
  - `{ "code":200, "msg":"success", "data": { "result":"开始了吗", "match_keyword":"开始", "match_action_code":"smile_action", "match_action_name":"微笑动作", "expression_name":"kaixin", "expression_platform":"live2d", "motions_name":"Tap", "is_match":true } }`
- 未命中关键词
  - `{ "code":500, "msg":"未匹配到关键词", "data": {"result":"开始了吗", "match_keyword":"", "match_action_code":"", "match_action_name":"", "expression_name":"", "expression_platform":"", "motions_name":"", "is_match":false} }`

  1、如果 motions_name 不为空，那么进一步再从 AihumanConfig 中的 actionParams 中取出 {"platform": "live2d", "Motions": [{"Name": "Tap", "action_code": "smile_action"}]}，根据 Name 调用前端的 playMotion("Tap")
  2、如果 motions_name 为空，那么不触发动作
  3、需要调用前端的 playMotion 方法，用于播放动作
  4、需要对接上述后端接口（之前已对接成功了，只是之前没有返回 motions_name 字段，这次多了这个字段）

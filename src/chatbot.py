import sys
import json
from claude_api import Client
claude_api = Client('__cf_bm=yPhSqZ4zdMdSJfbRF90GkmjSgUgFrtKxX6PV81vrXaA-1694923594-0-AVkGN9jsAVSIZoBmXwB1WIP//46mcEXWfb6WbnYn2v9HPaVVIh/6ebHy7jCMoZl/7/NsaHl3ns0VAcCHgI6t3do=; cf_clearance=MXIqDflmaNOe.wWOKi0DJZ4KBpwq3.Ti_hgZoVqvrdU-1694923596-0-1-f3633c7d.8d5d01c1.a462639d-0.2.1694923596; sessionKey=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')
conversation_id = claude_api.create_new_chat()['uuid']
text = sys.argv[1]

output_chatbot = ""
message_chatbot = text
conversation_id = claude_api.create_new_chat()['uuid']
output_chatbot += claude_api.send_message(message_chatbot, conversation_id)
deleted = claude_api.delete_conversation(conversation_id)

sys.stdout.write(json.dumps(output_chatbot))
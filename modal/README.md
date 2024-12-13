curl --request GET \
  --url 'https://anthonylouisburns--has-simple-web-endpoint-square.modal.run/?x=8' \
  --header 'User-Agent: insomnia/10.2.0'

curl 'https://anthonylouisburns--has-simple-web-endpoint-square.modal.run/?x=8' 
<!--  3.13.0/envs/modal-python-3 -->

https://modal.com/docs/reference/modal.config#modaltoml
## modal.config
Modal intentionally keeps configurability to a minimum.

The main configuration options are the API tokens: the token id and the token secret. These can be configured in two ways:

1. By running the modal token set command. This writes the tokens to .modal.toml file in your home directory.
2. By setting the environment variables MODAL_TOKEN_ID and MODAL_TOKEN_SECRET. This takes precedence over the previous method.

modal token set --token-id - --token-secret - --profile=dealstart
modal profile activate dealstart
modal profile activate anthonylouisburns
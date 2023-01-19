#!/bin/bash

npx aws-api-gateway-cli-test \
--username=REPLACE \
--password=REPLACE \
--user-pool-id='us-east-2_Tc1zNUzKb' \
--app-client-id='60o5mrs5hs3kdpkq8av1ksir00' \
--cognito-region='us-east-2' \
--identity-pool-id='us-east-2:55d4e1a8-0592-4cbe-8834-7b95c41a815c' \
--invoke-url='https://92i32szejb.execute-api.us-east-2.amazonaws.com' \
--api-gateway-region='us-east-2' \
--path-template='/notes' \
--method='GET'
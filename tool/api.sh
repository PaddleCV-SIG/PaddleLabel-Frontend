openapi-generator-cli generate \
-i ../PP-Label/pplabel/openapi.yml \
-g typescript-fetch \
-o src/services/web/ \
--additional-properties=useSingleRequestParameter=false \
--remove-operation-id-prefix \
--skip-validate-spec

openapi-generator-cli generate \
-i ../PP-Label-ML/pplabel_ml/openapi.yml \
-g typescript-fetch \
-o src/services/ml/ \
--additional-properties=useSingleRequestParameter=false \
--remove-operation-id-prefix \
--skip-validate-spec

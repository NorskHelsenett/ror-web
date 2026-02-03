[Back to README](README.md)

# How to use the API from the terminal

## Swagger

[Swagger](https://api.ror.nhn.no/swagger/index.html) is used to document the API.

For most usecases, one should use the [/v2/resources/... endpoint](https://api.ror.nhn.no/swagger/index.html#/resources). This depends on if what you are aiming to get is in the [v2 resources object](https://pkg.go.dev/github.com/NorskHelsenett/ror/pkg/rorresources), and if the data has been added for this new version. There is no good way to check if the data has been added, other than using an api call and seeing if you get data back.

## Prerequisites

You will need an API key. This can be gotten [here](https://ror.nhn.no/userprofile?tab=apikeys).

## Elements of API call in terminal

- `\` is used as a breakline at the end of every line in the terminal.
- `curl` sends an HTTP request to a server and prints the response.
- `-X` flag indicates that the type of call will be specified and should be followed up with `'GET'`, `'POST'`, `'PUT'`, `'PATCH'` or `'DELETE'`.
- The API endpoint can be gotten from [Swagger](https://api.ror.nhn.no/swagger/index.html).
- `-H` flag indicates that a header will be added. The headers we will use is `accept: application/json` and `X-API-KEY: the-api-key-gotten-from-ror.nhn.no`.
- `json_pp` can be used to get the output printed in a structured way

## Structure API call in terminal

This is a template one can use for an API call:

```bash
curl -X 'API CALL TYPE' \
    'api endpoint url' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: the-api-key-gotten-from-ror.nhn.no' \
    json_pp
```

This is an example of how an API call could be structured:

```bash
curl -X 'GET' \
    'https://api.ror.nhn.no/v2/resources?kind=KubernetesCluster' \
    -H 'accept: application/json' \
    -H 'X-API-KEY: b547d2b1-60cb-14g4-h361-c1c6d954h143' \
    json_pp
```

import { getCamelRandomId } from '../../../../camel-utils/camel-random-id';

export const kameletTemplate = () => {
  const kameletId = getCamelRandomId('kamelet');

  return `apiVersion: camel.apache.org/v1alpha1
kind: Kamelet
metadata:
  name: ${kameletId}
  annotations:
    camel.apache.org/kamelet.support.level: "Stable"
    camel.apache.org/catalog.version: "main-SNAPSHOT"
    camel.apache.org/kamelet.icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNjAgNjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYwIDYwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGQ9Ik00OC4wMTQsNDIuODg5bC05LjU1My00Ljc3NkMzNy41NiwzNy42NjIsMzcsMzYuNzU2LDM3LDM1Ljc0OHYtMy4zODFjMC4yMjktMC4yOCwwLjQ3LTAuNTk5LDAuNzE5LTAuOTUxCgljMS4yMzktMS43NSwyLjIzMi0zLjY5OCwyLjk1NC01Ljc5OUM0Mi4wODQsMjQuOTcsNDMsMjMuNTc1LDQzLDIydi00YzAtMC45NjMtMC4zNi0xLjg5Ni0xLTIuNjI1di01LjMxOQoJYzAuMDU2LTAuNTUsMC4yNzYtMy44MjQtMi4wOTItNi41MjVDMzcuODU0LDEuMTg4LDM0LjUyMSwwLDMwLDBzLTcuODU0LDEuMTg4LTkuOTA4LDMuNTNDMTcuNzI0LDYuMjMxLDE3Ljk0NCw5LjUwNiwxOCwxMC4wNTYKCXY1LjMxOWMtMC42NCwwLjcyOS0xLDEuNjYyLTEsMi42MjV2NGMwLDEuMjE3LDAuNTUzLDIuMzUyLDEuNDk3LDMuMTA5YzAuOTE2LDMuNjI3LDIuODMzLDYuMzYsMy41MDMsNy4yMzd2My4zMDkKCWMwLDAuOTY4LTAuNTI4LDEuODU2LTEuMzc3LDIuMzJsLTguOTIxLDQuODY2QzguODAxLDQ0LjQyNCw3LDQ3LjQ1OCw3LDUwLjc2MlY1NGMwLDQuNzQ2LDE1LjA0NSw2LDIzLDZzMjMtMS4yNTQsMjMtNnYtMy4wNDMKCUM1Myw0Ny41MTksNTEuMDg5LDQ0LjQyNyw0OC4wMTQsNDIuODg5eiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
    camel.apache.org/provider: "Apache Software Foundation"
    camel.apache.org/kamelet.group: "Users"
  labels:
    camel.apache.org/kamelet.type: "source"
spec:
  definition:
    title: ${kameletId}
    description: "Produces periodic events about random users!"
    type: object
    properties:
      period:
        title: Period
        description: The time interval between two events
        type: integer
        default: 5000
  types:
    out:
      mediaType: application/json
  dependencies:
    - "camel:timer"
    - "camel:http"
    - "camel:kamelet"
  template:
    from:
      id: ${getCamelRandomId('from')}
      uri: "timer:user"
      parameters:
        period: "{{period}}"
      steps:
      - to: https://random-data-api.com/api/v2/users
      - to: "kamelet:sink"`;
};

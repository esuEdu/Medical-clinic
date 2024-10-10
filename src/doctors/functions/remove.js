import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpContentNegotiation from "@middy/http-content-negotiation";
import httpResponseSerializer from "@middy/http-response-serializer";
import DoctorsService from "../doctors.service.js";

const remove = async (event) => {
  const { id } = event.pathParameters;
  try {
    await DoctorsService.deleteById(id);
    return {
      statusCode: 204,
      body: JSON.stringify({ message: "Doctor removed Successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middy()
.use(httpHeaderNormalizer())
.use(httpContentNegotiation())
.use(
  httpResponseSerializer({
    serializers: [
      {
        regex: /^application\/xml$/,
        serializer: ({ body }) => `<message>${body}</message>`,
      },
      {
        regex: /^application\/json$/,
        serializer: ({ body }) => JSON.stringify(body),
      },
      {
        regex: /^text\/plain$/,
        serializer: ({ body }) => body,
      },
    ],
    defaultContentType: "application/json",
  })
)
.use(httpErrorHandler())
.use(httpJsonBodyParser({ disableContentTypeError: true }))
.handler(remove);
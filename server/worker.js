import { Worker } from "bullmq";
import fs from "fs";
import * as pdfParse from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
 const loader = new PDFLoader(DataTransfer.path);
 const docs =await loader.load()

    console.log("Docs:" ,docs);
  },
  {
    concurrency: 100,
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

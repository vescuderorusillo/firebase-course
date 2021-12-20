import * as functions from "firebase-functions";
import { createUserApp } from "./create-user";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const createUser = functions.https.onRequest(createUserApp);

export const onAddCourseUpdatePromoCounter = 
    functions
        .runWith({
            timeoutSeconds: 300,
            memory: "128MB"
        })
        .firestore.document("courses/{courseId}")
        .onCreate(async(snap, context) =>{
            await (await import("./promotions-counter/on-add-course")).default(snap, context);
        });

export const onUpdateCourseUpdatePromoCounter = 
    functions
        .firestore.document("courses/{courseId}")
        .onUpdate(async(change, context) =>{
            await (await import("./promotions-counter/on-update-course")).default(change, context);
        });

export const onDeleteCourseDeletePromoCounter = 
    functions
        .firestore.document("courses/{courseId}")
        .onDelete(async(snap, context) =>{
            await (await import("./promotions-counter/on-delete-course")).default(snap, context);
        });
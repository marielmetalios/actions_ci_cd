import models from '../models/index.js';
import db from '../config/connection.js';
export default async (modelName, collectionName) => {
    try {
        //     let modelExists = await models[modelName].db.db.listCollections({
        //       name: collectionName
        //     }).toArray()
        //     if (modelExists.length) {
        //       await db.dropCollection(collectionName);
        //     }
        //   } catch (err) {
        //     throw err;
        //   }
        // }
        // Ensure the model exists
        if (!models[modelName]) {
            throw new Error(`Model "${modelName}" does not exist.`);
        }
        // Ensure the model has a valid database connection
        if (!models[modelName].db || !models[modelName].db.db) {
            throw new Error(`Database connection is missing for model "${modelName}".`);
        }
        // Access collections safely
        let modelExists = await models[modelName].db.db
            .listCollections({ name: collectionName })
            .toArray();
        // Drop collection if it exists
        if (modelExists.length) {
            if (!db || !db.dropCollection) {
                throw new Error("Database connection is not properly initialized.");
            }
            await db.dropCollection(collectionName);
        }
    }
    catch (err) {
        console.error("Error in database operation:", err);
        throw err;
    }
};

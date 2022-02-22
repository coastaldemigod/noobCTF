
// Reference
// https://mongoosejs.com/docs/faq.html#unique-doesnt-work

// the "unique" property is not a validator 
// i.e. two users with same usernames could be added to the database.


// creating & exporting multiple models from a single file just doesn't work
// Moreover MDN suggests making one model/file, it does not justify this.
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#one_schemamodel_per_file
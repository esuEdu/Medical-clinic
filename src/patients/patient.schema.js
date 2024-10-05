import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema(
    {
        id: String,
        age: Number,
    },
    {
        saveUnknown: true,
        timestamps: true,
    }
);

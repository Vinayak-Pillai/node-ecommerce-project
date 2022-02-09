import mongoose from 'mongoose';

const {Schema}=mongoose;

const schema=new Schema({
    subcategory_name:{
        type:String
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
})

const Subcategory=mongoose.model('Subcategory',schema);

export default Subcategory;
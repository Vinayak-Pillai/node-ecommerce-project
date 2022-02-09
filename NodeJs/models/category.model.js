import mongoose from 'mongoose';

const {Schema}=mongoose;

const schema=new Schema({
    category_name:{
        type:String
    }
})

const Category=mongoose.model('Category',schema);

export default Category;
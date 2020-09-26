import React, { useReducer } from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import Form from "./styles/Form";
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
        id
      }     
  }
`;

const texts = {
  imageField: 'Image',
  titleField: 'Title',
  priceField: 'Price',
  descriptionField: 'Description',
  submitButton: 'Submit'
};

const CreateItem = () => {
  const [itemInput, setItemInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      title: '',
      description: '',
      image: '',
      largeImage: '',
      price: ''
    }
  );

  const handleInputChange = e => {
    const { name, type, value } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;

    setItemInput({[name]: newValue});
  };

  const uploadImage = async e => {
    console.log('uploading file');
    const images = e.target.files;
    const data = new FormData;
    data.append('file', images[0]);
    data.append('upload_preset','wafshop');
    const response = await fetch('https://api.cloudinary.com/v1_1/wafloski/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await response.json();
    console.log(file);
    setItemInput({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={itemInput}>
      {(createSingleItem, { loading, error }) => (
        <Form onSubmit={async e => {
          e.preventDefault();
          const response = await createSingleItem();
          console.log(response);
        }}>
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor='image'>
              {texts.imageField}
              <input
                type='file'
                id='image'
                name='image'
                placeholder='Upload image'
                required
                onChange={uploadImage}
              />
              {itemInput.image && (
                <img src={itemInput.image} alt='Upload image' />
              )}
            </label>
            <label htmlFor='title'>
              {texts.titleField}
              <input
                type='text'
                id='title'
                name='title'
                placeholder='Title'
                required
                value={itemInput.title}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='price'>
              {texts.priceField}
              <input
                type='number'
                id='price'
                name='price'
                placeholder='Price'
                required
                value={itemInput.price}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='description'>
              {texts.descriptionField}
              <textarea
                id='description'
                name='description'
                placeholder='Description'
                required
                value={itemInput.description}
                onChange={handleInputChange}
              />
            </label>
            <button type='submit'>{texts.submitButton}</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default CreateItem;

import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFormData } from './interface';
import ReactSelect from 'react-select'
import './app.css'

function App() {
  const {
          register,
          handleSubmit,
          watch,
          setValue,
          formState: {errors}, 
          reset,
          control,
        } = useForm<IFormData>({
              mode: 'all'
            });

  const nameWatcher  = watch('name')
  const country  = watch('name');
  

  const options:any= [
    {value: 'Ukraine', label: 'Ukraine'},
    {value: 'USA', label: 'USA'},
    {value: 'Poland', label: 'Poland'},
  ]

  const getValue = (value: string) => {
    return value ? options.find((option: any) => option.value === value) : ''
  }

  const onSubmit: SubmitHandler<IFormData>  = (data) => {
    console.log(data);
    alert(`Your name ${data.name}`)
    reset()
  }
  
  return (
    <div className='app'>
      <form onSubmit={handleSubmit(onSubmit)}> 
          <input type='text'  {...register('name', {
            required: 'name is required field',
            minLength: 5,
          })}/> 
          {errors?.name && <div style={{color: 'red'}} >{ errors.name.message }</div>}
          {errors?.name?.type === 'minLength' && <div style={{color: 'red'}} >{'name must have at least 5 letters'}</div>}

          <input type='text' {
              ...register(
                'email', {
                  required: 'Email must be valid',
                  pattern: {
                    value: /^[A-Za-z]/ ,
                    message:
                        'email must be valid',
                  },
                }
              )
            } 
            disabled={!nameWatcher}
          />
          {errors?.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
            <Controller 
              control={control}
              name='address.country'
              rules={{
                required: 'Country is required'
              }}
              render={({field :  { onChange, value }, fieldState: {error}}) => (
                <>
                <ReactSelect 
                  placeholder={'COUNTRIES'}
                  options={options}
                  value={getValue(value)}
                  onChange={(newValue) => onChange(newValue.value)}
                  components={{}}
                />
              {error && <div>{error.message}</div>}
              </>
              )}
              />  

          <div><button type='submit'>submit</button></div>
      </form>
      <div><button onClick={() => {
            setValue('name', 'new name from set VAlue')
            setValue('email', 'test')
            setValue('address.country', 'Ukraine')
          
          }}>fill all</button></div>
    </div>
  );
}

export default App;

// load playwright module

import { request } from "http"

import { test, expect } from '@playwright/test';
import{faker} from '@faker-js/faker';

const  { DateTime }= require('luxon')

// write a test
test('Create POST api request using dynamic request body ',async({request})=>{

  const firstName = faker.person.firstName();
  const lasttName = faker.person.lastName();
  const totalprice = faker.number.int(1000)
  const chekInDate =  DateTime.now().toFormat('yyyy-MM-dd')
  const chekOutDate =  DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')

  //create POST api request
  const postAPIResponse= await request.post(`/booking`,{
    data: {
        "firstname": firstName,
        "lastname": lasttName,
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          "checkin": chekInDate,
          "checkout": chekOutDate,
        },
        additionalneeds: "super bowls",
      },
    })

     //validate status code 
     expect(postAPIResponse.ok()).toBeTruthy();
     expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody=await postAPIResponse.json();
    console.log(postAPIResponseBody);
 




//Validate JSON api response
expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName)
expect(postAPIResponseBody.booking).toHaveProperty( "lastname", lasttName)


//Validate Nested JSON objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", chekInDate)
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout", chekOutDate)





});
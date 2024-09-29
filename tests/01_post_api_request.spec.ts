// load playwright module

import { request } from "http"

import { test, expect } from '@playwright/test';


// write a test
test('Create POST api request using static request body ',async({request})=>{
  
  //create POST api request
  const postAPIResponse= await request.post(`/booking`,{
    data: {
        "firstname": "testers talk playwright",
        "lastname": "testers talk api testing",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01",
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
expect(postAPIResponseBody.booking).toHaveProperty("firstname", "testers talk playwright")
expect(postAPIResponseBody.booking).toHaveProperty( "lastname", "testers talk api testing")


//Validate Nested JSON objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout", "2019-01-01")





});
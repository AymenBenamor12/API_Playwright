// load playwright module

import { request } from "http"

import { test, expect } from '@playwright/test';
import { stringFormat } from "../utils/common";


const bookingAPIrequestBody= require('../test-data/post_dynamic_request_body.json');
// write a test
test('Query parameters in Playwright ',async({request})=>{
  
  const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIrequestBody),"testers talk cypress ","testers talk javascript","apple")
  //create POST api request
  const postAPIResponse= await request.post(`/booking`,{
    data: JSON.parse(dynamicRequestBody)
    })

     //validate status code 
     expect(postAPIResponse.ok()).toBeTruthy();
     expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody=await postAPIResponse.json();  
    console.log(postAPIResponseBody);
    const bId = postAPIResponseBody.bookingid;

//Validate JSON api response
expect(postAPIResponseBody.booking).toHaveProperty("firstname", "testers talk cypress")
expect(postAPIResponseBody.booking).toHaveProperty( "lastname", "testers talk javascript")


//Validate Nested JSON objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout", "2019-01-01",)

console.log("=======================================================")

// GET api call
const getAPIresponse = await request.get(`/booking/`,{
  params:{
     "firstname": "testers talk cypress",
   "lastname": "testers talk javascript"
  }
  
})
console.log(await getAPIresponse.json())

//validate status code
expect(getAPIresponse.ok()).toBeTruthy();
expect(getAPIresponse.status()).toBe(200);




});
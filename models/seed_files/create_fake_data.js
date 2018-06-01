/* This file should contain all the record creation needed to seed the database with its default values.
The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

 Examples:

   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
   Mayor.create(name: 'Emanuel', city: cities.first)
*/

Restaurant.create(userId: 'test', restaurantId: 'resttest', rating: 9, text: 'best restaurant');
Review.create(name: 'testing', lat: 100, lng: 100, address: 'test address', text: 'this is a great restaurant', phoneNumber: '0114234234', cuisine: 'italian', score: 8, url: 'www.italianrestaurant');
User.create(name: 'test1', username: 'testing1', password: 'this is a test');

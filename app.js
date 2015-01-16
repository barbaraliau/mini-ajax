$(document).ready(function(){
	//can use console.log("test"); to make sure app.js is connecting and loading

//gets user information and console logs it if data is retrieved successfully
//when you click on the #getUser ID, return the ajax function method (get data from this URL and when you get it, log it to the console and insert it)
$('#getUsers').on('click', function() {
	//selecting ajax method, and all these other things are parameters
	return $.ajax({
		//get request to retrieve data
		method: 'GET',
		//sending request to this place
		url: 'http://reqr.es/api/users?page=1',
		//on successfully retrieveing data, run this callback function
		success: function(res) { //callback function
			console.log(res);
			insertData(res.data);
		}
	});
});

//insertData function takes in the data, parses out its valuable information with a loop, and writes it into the DOM
//arr = data we get from the API
var insertData = function(arr) {
	for (var i = 0; i < arr.length; i++) {
		//equate to userInfo1, then userInfo2, then userInfo3, and add html to it. html is a function right here
		$('#userInfo' + (i + 1)).html('<div>' + 
			'User Info:' +
			'<li>' +
			'First name: ' + arr[i].first_name +
			'</li>' +
			'<li>' +
			'Last name: ' + arr[i].last_name +
			'</li>' +
			'<hr>' +
			'</div>'
		)
	};
}

//call the insertData function with the data receive. insert call into getUser request above

//make it so submit button can handle a click event
$('#addUser').on('click', function(e) {
	//form submitting is the default. by default buttons reload the page. don't do that.
	e.preventDefault();
		//capture the value of the inpur forms using .val() --> gives us the value of something, in this case #name--> once we've filled out the form, the value of the input fields are what we typed into it
	var userName = $('#name').val();
	var userJob = $('#job').val();
	//have the function retur ajax POST request
	return $.ajax({
		//post creates a new thing, put changes objects already there
		method: 'POST',
		url: 'http://reqr.es/api/users',
		//lets us pass specific information to the API. this object is going to be whatever we passed into the name input field and job input field
		data: {name: userName, job: userJob},
		//inside success function, make some html to add into our DOM. this is saying if our data posts successfully, send us back this data and display it so we know
		success: function(res) {
			$('#recentUser').html(
				'<li>' +
					'name: ' + res.name + 
				'</li>' +
				'<li>' +
					'job: ' + res.job +
				'</li>' +
				'<li>' +
					'id: ' + res.id +
				'</li>' +
				'<li>' +
					'created at: ' + res.createdAt +
				'</li>'
			)
		}
	})

});




});
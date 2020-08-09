$('#navbar').load('navbar.html');

 const API_URL = 'http://localhost:5000/api';

 const MQTT_URL = 'http://localhost:5001/send-command';

 const currentUser = localStorage.getItem('user');

if (currentUser) { 
  $.get(`${API_URL}/users/${currentUser}/devices`) 
.then((response) => {
response.forEach((device) => { 
  $('#devices tbody').append(`
  <tr data-device-id=${device._id}> 
  <td>${device.user}</td> 
  <td>${device.name}</td>
  </tr>`); 
});

$('#devices tbody tr').on('click', (e) => {
  const deviceId = e.currentTarget.getAttribute('data-device-id'); 
  $.get(`${API_URL}/devices/${deviceId}/device-history`) .then((response) => {
    response.map(sensorData => { 
      $('#historyContent').append(`
    <tr>
    <td>${sensorData.ts}</td> 
    <td>${sensorData.temp}</td> 
    <td>${sensorData.loc.lat}</td> 
    <td>${sensorData.loc.lon}</td>
    </tr> `);
    }); 
    $('#historyModal').modal('show');
  });
});
})
.catch((error) => {console.error(`Error: ${error}`); 
});
} 
else {
  const path = window.location.pathname; 
  if (path !== '/login') {
  location.href = '/login';
} 
}

 $.get(` ${API_URL}/devices `) 
 .then((response) => {
  response.forEach((device) => { 
    $('#devices tbody').append(`
  <tr> 
  <td>${device.user}</td> 
  <td>${device.name}</td>
  </tr>`
  ); 
  });
  })
  .catch(error => {
  console.error(`Error: ${error}`); 
});

  //Add device
$('#add-device').on('click', () => { 
  const name = $('#name').val(); 
  const user = $('#user').val(); 
  const sensorData = [];
  const body = {
    name,
    user,
    sensorData,
  };

$.post("` ${API_URL}/devices `", body) 
.then((response) => {
  location.href = '/'; 
})
  .catch((error) => { 
  console.error(`Error: ${error}`);
}); 
});

  //Send Command
    $('#send-command').on('click', function() { 
        const command = $('#command').val(); 
        const deviceId = $('#deviceid').val();
        console.log(`deviceid is: ${deviceId}`);
        console.log(`command is: ${command}`);
        
        const body1 = { command, deviceId };
        $.post(`${MQTT_URL}`, body1) ;
  
});

//Register
$('#add-user').on('click', function() {
  const user1 = $('#LoginName').val();
  const password = $('#LoginPassword').val();
  const confirmpassword = $('#confirmpassword').val();

  if(password !== confirmpassword){
    alert("Please make sure that password and confirmpassword are matched");
  }
  else{
    $.post(`${API_URL}/registration`, { 
      name: user1, 
      password: password,
    }) .then((response) => {
      if (response.success) {
      location.href = '/login';
      } else {
      alert ("Register fail");
    }
  });
  }
});

//Login  

$('#login').on('click', function() { 
  const user2 = $('#user2').val();
  const password2= $('#password2').val();

  $.post(`${API_URL}/authenticate`, { 
    name: user2, 
    password: password2,
  }) .then((response) =>{
    if (response.success) {
    localStorage.setItem('user', user2); 
    localStorage.setItem('isAdmin', response.isAdmin); 
    location.href = '/';
    } else {
    $('#message').append(`<p class="alert alert-danger">${response}
    </p>`); }
    }); 
  });


const logout = () => { 
  localStorage.removeItem('user'); 
  location.href = '/login';
};
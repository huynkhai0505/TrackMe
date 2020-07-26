$('#navbar').load('navbar.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];

devices.forEach(function(device) { 
    $('#devices tbody').append(`
    <tr>
      <td>${device.user}</td> 
      <td>${device.name}</td>
    </tr>`
  ); });

  //Iterate in userLogin
users.forEach(function (user) { 
  $('#users tbody').append(`
  <tr>
    <td>${user.user1}</td> 
    <td>${user.password}</td>
  </tr>`
); });

  //Add device
$('#add-device').on('click', function() { 
    const user = $('#user').val();
    const name = $('#name').val();
    devices.push({ user: user, name: name }); 
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/';
    });
    
    $('#send-command').on('click', function() { 
        const command = $('#command').val(); 
        console.log(`command is: ${command}`);
});

//Register
$('#register').on('click', function() { 
  const user1 = $('#LoginName').val();
  const password = $('#LoginPassword').val();
  const confirmpassword = $('#confirmpassword').val();

  const exists = users.find((user) => { 
    return user.user1 === user1;
  });

  if(exists){
    alert("This User Name has been registered");
  }
  else{
    //push in localStorage
    users.push ({ user1, password });
    localStorage.setItem('users', JSON.stringify(users));
    location.href = 'login.html'; 
  }
});

//Login  

$('#login').on('click', function() { 
  const user2 = $('#user2').val();
  const password2= $('#password2').val();

  //Check existed
  const existed = users.find(user => {
    if( user.user1 === user2 && user.password === password2 ) {
      return true;
    } else {
      return false;
    }
  });
    if(existed) {
    localStorage.setItem( 'isAuthenticated', true);
    location.href = "/";
  } else {
      alert("Wrong Password or Username");
    }
});   
  
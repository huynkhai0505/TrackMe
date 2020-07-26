$('#navbar').load('navbar.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];

devices.forEach(function(device) { 
    $('#devices tbody').append(`
    <tr>
      <td>${device.user}</td> 
      <td>${device.name}</td>
    </tr>`
  ); });

  //Add device
$('#add-device').on('click', function() { 
    const user = $('#user').val();
    const name = $('#name').val();
    devices.push({ user: user, name: name }); 
    console.log(devices);
    
    $('#send-command').on('click', function() { 
        const command = $('#command').val(); 
        console.log(`command is: ${command}`);
});

localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/';
    });
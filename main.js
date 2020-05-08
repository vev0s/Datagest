const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Detect when app is ready
app.on('ready', function() {
	// Create a new window
	mainWindow = new BrowserWindow({
		webPreferences: {
      		nodeIntegration: true
    	}
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: 'file:',
		slashes: true,
		webPreferences: {
      		nodeIntegration: true
    	}
	}));

	// Quit app when closed
	mainWindow.on('closed', function(){
		app.quit();
	});

	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

function wait(ms) {
	var d = new Date();
	var d2 = null;
	do { d2 = new Date(); }
	while(d2-d < ms);
}

// Create addWindow
function createHostWindow() {
	hostWindow = new BrowserWindow({
		width: 430,
		height: 580,
		webPreferences: {
      		nodeIntegration: true
    	},
		title: 'Link a new database'
	});

	hostWindow.loadURL(url.format({
		pathname: path.join(__dirname, "hostWindow.html"),
		protocol: 'file:',
		slashes: true
	}));

	hostWindow.on('close', function() {
		hostWindow = null;
	});
}

function createCoWindow() {
	connectWindow = new BrowserWindow({
		width: 300,
		height: 150,
		webPreferences: {
      		nodeIntegration: true
    	},
		title: 'Database connected'
	});

	connectWindow.loadURL(url.format({
		pathname: path.join(__dirname, "./alerts/dataConnect.html"),
		protocol: 'file:',
		slashes: true
	}));

	connectWindow.on('close', function() {
		connectWindow = null;
	});
}

function createSavedWindow() {
	savedWindow = new BrowserWindow({
		width: 300,
		height: 150,
		title: 'Database saved'
	});

	savedWindow.loadURL(url.format({
		pathname: path.join(__dirname, "./alerts/dataSaved.html"),
		protocol: 'file:',
		slashes: true
	}));

	savedWindow.on('close', function() {
		savedWindow = null;
	});
}

function createDelWindow() {
	delWindow = new BrowserWindow({
		width: 300,
		height: 150,
		title: 'Database unlinked'
	});

	delWindow.loadURL(url.format({
		pathname: path.join(__dirname, "./alerts/dataDel.html"),
		protocol: 'file:',
		slashes: true
	}));

	delWindow.on('close', function() {
		delWindow = null;
	});
}

let logWindow;

function createLogWindow() {
	logWindow = new BrowserWindow({
		width: 400,
		height: 380,
		webPreferences: {
      		nodeIntegration: true
    	},
		title: 'Connect Datagest to the database'
	});

	logWindow.loadURL(url.format({
		pathname: path.join(__dirname, "./connect.html"),
		protocol: 'file:',
		slashes: true
	}));

	logWindow.on('close', function() {
		logWindow = null;
	});
}

// Catch the item
ipcMain.on('host:add', function(e, hostname) {
	ipcMain.on('port:add', function(e, port) {
		ipcMain.on('database:add', function(e, database) {
			let data = {host: hostname, database: database, port: port};
			fs.writeFile ("./config/connect.json", JSON.stringify(data), function(err) {
				if (err) throw err;
					console.log('Données enregistré !');
				}
			);
			hostWindow.close();
		})
	})
});

ipcMain.on('message:go', function(e) {
	fs.readFile('./config/connect.json', function(err, jsonString) {
		if (err) {
			console.log("Error : " + err);
		}
		try {
			const data = JSON.parse(jsonString);
			const database = data['database'];
			const host = data['host'];
			ipcMain.send('database:send', database);
			ipcMain.send('host:send', host);
		}
		catch(err) {
			console.log("Error : " + err);
		}
	});
})

function main() {
	fs.readFile('./config/connect.json', function(err, jsonString) {
		if (err) {
			console.log("Error : " + err);
		}
		try {
			const data = JSON.parse(jsonString);
			const database = data['database'];
			const host = data['host'];
			const port = data['port'];

			var con = mysql.createConnection({
			    host: host,
			    user: username,
			    password: password,
			    database: database,
			    port: port
			});

			con.connect(err => {
		  		if(err) throw err;
		  		console.log("Database connected !")
			});
		}
		catch(err) {
			console.log("Error : " + err);
		}
	});
}

// Create menu template
const menuTemplate = [
	{
		label:'File',
		submenu: [
			{
				label:'Link a new database',
				click(){
					createHostWindow();
					ipcMain.on('connected', function() {
						createCoWindow();
					});
				}
			},
			{
				label:'Connect to the database',
				click(){
					createLogWindow();
				}
			},
			{
				label:'Unlink the database',
				click(){
					fs.unlinkSync('./config/connect.json');
					createDelWindow();
				}
			},
			{
				label:'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' :
				'Ctrl+Q',
				click(){
					app.quit();
				}
			},
		]
	}
];
menuTemplate.push({
	label: 'Developper Tools',
	submenu: [
		{
			label: 'Toggle Developper Tools',
			accelerator: process.platform == 'darwin' ? 'Command+I' :
			'Ctrl+I',
			click(item, focusedWindow){
					focusedWindow.toggleDevTools();
			}
		},
		{
			role: 'reload'
		}
	]
});

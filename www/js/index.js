/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('menubutton', this.onMenuButton, false);
		document.addEventListener('backbutton', this.onBackButton, false);

		//app.onDeviceReady();	// Manual overwrite for testing purposes
    },
	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
		// Gets all HTML elements required for the rest of the code
		// Calling on the document after IFrames are set causes problems, therefor they are saved to variables in advance
		pages = { 
			"roosterwijzigingen": document.getElementById('roosterwijzigingen'), 
			"mededelingen": document.getElementById('mededelingen'), 
			"instellingen": document.getElementById('instellingen'),
			"leraarrooster": document.getElementById('leraarrooster')
		};
		
		tabs = {
			"roosterwijzigingen": document.getElementById('tab-roosterwijzigingen'),
			"mededelingen": document.getElementById('tab-mededelingen'),
			"instellingen": document.getElementById('tab-instellingen'),
			"leraarrooster": document.getElementById('tab-leraarrooster')
		};
		
		schools = document.getElementsByClassName('school');
		teachers = document.getElementsByClassName('teacher');
		
		teacherSelect = document.getElementById('teacherSelect');
		teacherSelectGym = document.getElementById('teacherSelectGym');
		teacherSelectMon = document.getElementById('teacherSelectMon');
		
		//Sets some default values for startup and first time use, when nothing is in the localStorage yet
		currentPage = pages.roosterwijzigingen;
		currentTab = tabs.roosterwijzigingen;
		
		if (localStorage.school == null) {
			localStorage.school = "gymnasium";
		}

		if (localStorage.teacher == null) {
			localStorage.teacher = "none";
		}
		
		for (var i = 0; i < schools.length; i++) {
			if (schools[i].value == localStorage.school) {
				schools[i].selected = true;
			} else {
				schools[i].selected = false;
			}
		}
		
		for (var i = 0; i < teachers.length; i++) {
			if (teachers[i].value == localStorage.teacher) {
				teachers[i].selected = true;
			} else {
				teachers[i].selected = false;
			}
		}
		
		// Loads the appropriate pages at startup
		app.onSchoolSwitch();
		
	},
	
	// Handles menu button event
	onMenuButton: function() {	
		switchPage("instellingen");
	},
	
	// Handles back button event
	onBackButton: function() {
		switchPage(previousPage);
	},
	
	// Changes the pages to be appropriate to the selected school
	// The resetTeacher argument, when set to "true", will reset the selected teacher to avoid conflicts when switching schools
	// resetTeacher doesn't get called when setting up IFrames for the first time after startup
	onSchoolSwitch: function(resetTeacher) {
		
		switch(localStorage.school) {
			
			case "gymnasium": 
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/gym_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermgymnasium'/>";
				teacherSelect.className = 'shown';
				teacherSelectGym.classList.remove('hidden');
				teacherSelectMon.classList.add('hidden');
				break;
			
			case "montessori":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/mon_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermmontessori'/>";
				teacherSelect.className = 'shown';
				teacherSelectGym.className = 'hidden';
				teacherSelectMon.className = 'shown';
				break;
				
			case "lyceum":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/lyc_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermlyceum'/>";
				teacherSelect.className = 'hidden';
				teacherSelectGym.className = 'hidden';
				teacherSelectMon.className = 'hidden';
				break;
				
			case "montessori":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/mon_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermmontessori'/>";
				teacherSelect.className = 'hidden';
				teacherSelectGym.className = 'hidden';
				teacherSelectMon.className = 'hidden';
				break;
			
			case "dedyk":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/dyk_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermdedyk'/>";
				teacherSelect.className = 'hidden';
				teacherSelectGym.className = 'hidden';
				teacherSelectMon.className = 'hidden';
				break;
				
			case "dokkum":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/dok_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermdokkum'/>";
				teacherSelect.className = 'hidden';
				teacherSelectGym.className = 'hidden';
				teacherSelectMon.className = 'hidden';
				break;
		}
		
		if (resetTeacher) {
			localStorage.teacher = 'none';
		}
		
		for (var i = 0; i < teachers.length; i++) {
			if (teachers[i].value == localStorage.teacher) {
				teachers[i].selected = true;
			} else {
				teachers[i].selected = false;
			}
		}
		
		app.onTeacherSwitch();
		
	},
	
	// Changes the "leraarrooster" page to match the selected teacher
	onTeacherSwitch: function() {
		if (localStorage.teacher != 'none') {
			tabs.leraarrooster.classList.remove('hidden')
			tabs.instellingen.classList.add('sided');
			switch(localStorage.school) {
				case "gymnasium": 
					pages.leraarrooster.innerHTML = "<iframe src='http://www3.pj.nl/roostergym/doc/Doc1_" + localStorage.teacher + ".htm'/>";
					break;
				case "montessori":
					pages.leraarrooster.innerHTML = "<iframe src='http://www3.pj.nl/roostermon/doc/Doc1_" + localStorage.teacher + ".htm'/>";
					break;
			}
		} else {
			tabs.leraarrooster.classList.add('hidden')
			tabs.instellingen.classList.remove('sided');
		}
	},
	
	// Switches display of "page" divs
	switchPage: function(page) {
		
		var pageToLoad = pages[page];
		
    	currentPage.classList.remove('selected');
    	pageToLoad.classList.add('selected');
		
    	
    	for (var i in tabs) {
    		tabs[i].classList.remove('selected');
    	}
    	tabs[page].classList.add('selected');
    	
    	
    	previousPage = currentPage;
    	currentPage = pageToLoad;
	}
};

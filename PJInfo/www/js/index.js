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

		app.onDeviceReady();
    },
	
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
		pages = { 
			"roosterwijzigingen": document.getElementById('roosterwijzigingen'), 
			"mededelingen": document.getElementById('mededelingen'), 
			"instellingen": document.getElementById('instellingen')
		};
		
		tabs = {
			"roosterwijzigingen": document.getElementById('tab-roosterwijzigingen'),
			"mededelingen": document.getElementById('tab-mededelingen'),
			"instellingen": document.getElementById('tab-instellingen')
		};
		
		schools = document.getElementsByClassName('school');
		
		currentPage = pages.roosterwijzigingen;
		currentTab = tabs.roosterwijzigingen;
		
		if (localStorage.school == null) {
			localStorage.school = "gymnasium";
		}
		
		for (var i = 0; i < 6; i++) {
			if (schools[i].value == localStorage.school) {
				schools[i].selected = true;
			} else {
				schools[i].selected = false;
			}
		}
		
		app.initIFrames();
	},
	
	// Handles menu button event
	onMenuButton: function() {	
		switchPage("instellingen");
	},
	
	// Handles back button event
	onBackButton: function() {
		switchPage(previousPage);
	},
	
	// Required because loading the IFrame early causes problems with the javascript
	initIFrames: function() {
		switch(localStorage.school) {
			case "gymnasium": 
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/gym_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermgymnasium'/>";
				break;
			
			case "montessori":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/mon_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermmontessori'/>";
				break;
				
			case "lyceum":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/lyc_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermlyceum'/>";
				break;
				
			case "montessori":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/mon_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermmontessori'/>";
				break;
			
			case "dedyk":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/dyk_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermdedyk'/>";
				break;
				
			case "dokkum":
				pages.roosterwijzigingen.innerHTML = "<iframe src='http://www3.pj.nl/dok_info_leerlingen/subst_001.htm'/>";
				pages.mededelingen.innerHTML = "<iframe src='http://www3.pj.nl/infoschermdokkum'/>";
				break;
		}
		
		
	},
	
	// Switch display of "page" divs
	switchPage: function(page) {
		
		var pageToLoad = pages[page];
		
    	currentPage.className = 'page';
    	pageToLoad.className = 'page selected';
		
    	
    	for (var i in tabs) {
    		tabs[i].className = "tab";
    	}
    	tabs[page].className = "tab selected";
    	
    	
    	previousPage = currentPage;
    	currentPage = pageToLoad;
	}
};

var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
var time = date.toLocaleTimeString();

var dateTime = today + " at " + time;

document.querySelector("#submitdate").value = dateTime;


// adapted from https://www.codeply.com/go/mhkMGnGgZo/bootstrap-4-validation-example
$("#bootstrapForm").submit(function(event) {
	

	// make selected form variable
	var vForm = $(this);
	
  /*
  If not valid prevent form submit
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
  */
	if (vForm[0].checkValidity() === false) {
		
		
	  event.preventDefault()
	  event.stopPropagation()
	} else {
	 
		// Replace alert with ajax submit here...
		//$('.loading-screen').addClass('active');
		
		//get data
				
        const btn = document.querySelector(".loading");
        btn.classList.add("button--loading");
        var data = $('form#bootstrapForm').serialize();
        $.ajax({
                  type : 'GET',
                  url : 'https://script.google.com/macros/s/AKfycbz-oufSuP6wmDn7rihrBZcY9KdA2P2pXnOtHN_DWZ9HN1Sr2vR7plt7JbLPFWSTzGbH/exec',
                  dataType:'json',
                  crossDomain : true,
                  data : data,
                  success : function(data)
               {                						
					$('#submit-tb').attr("disabled", "disabled");
					$('#submit-tb').attr('style', 'background-color:#e3e7ee;');
					$('input[name="Contact_Name"]').val('');
					$('input[name="Contact_Email"]').val('');
					$('input[name="Contact_Mobile"]').val('');
					$('select[name="Contact_Location"]').val('');
					$('select[name="Contact_Birthday"]').val('');
					                    
					Swal.fire({                        
						title: "CẢM ƠN QUÝ KHÁCH", 
						text: "Quý khách đã đặt lịch lái thử thành công. Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất.", 
						icon: "success",
						confirmButtonText: "OK"                                             
						})
						.then((result) => {
							if (result.value) {
								//window.location = 'https://bmw-motorcycles.vn/';
								 location.reload(true);
							} else if (result.dismiss === 'cancel') {
								Swal.fire(
								  'Cancelled',
								  'Your stay here',
								  'error'
								)
							}
						});
                        btn.classList.remove("button--loading");									
				}
                });
                	
	}
	return false;
	
	// Add bootstrap 4 was-validated classes to trigger validation messages
	//vForm.addClass('was-validated');
	
 
});

// Dynamically removing an external JS or CSS file
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}
 
removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
removejscssfile("55013136-widget_css_bundle.css", "css") //remove all occurences "somestyle.css" on page
// End - Dynamically removing an external JS or CSS file

		//datepicker
		$('#datepicker').datepicker({
			//daysOfWeekDisabled: [0],
			maxViewMode: 0,
			startDate: '+3d',
			
		});
		
		 $('.input-group.date').datepicker({format:'dd/mm/yyyy'}); 

		$('#datepicker').on('changeDate', function() {
			$("#Contact_DateRide").focus();
			$('#Contact_DateRide').val(
				$('#datepicker').datepicker('getFormattedDate')
				
			);
			
		});

		//add dealers list
		function updateDropdown(selectedRadio) {
            const dropdown = document.getElementById("selected-dealer");
            dropdown.innerHTML = ""; // Clear existing options

            if (selectedRadio.value === "R 1250 GS" || selectedRadio.value === "R 1250 GS Adventure" || selectedRadio.value === "C 400 GT" || selectedRadio.value === "R nineT" || selectedRadio.value === "R 18") {
                // Update dropdown options based on Option 1
                const dealerslist1 = [
					{ text: "- CHỌN ĐỊA ĐIỂM LÁI THỬ -", value: "" },
                    { text: "BMW Motorrad Long Biên", value: "BMW Motorrad Long Biên" },
                    { text: "BMW Motorrad Đà Nẵng", value: "BMW Motorrad Đà Nẵng" },
                    { text: "BMW Motorrad Sala", value: "BMW Motorrad Sala" },
					{ text: "BMW Motorrad Nguyễn Văn Trỗi", value: "BMW Motorrad Nguyễn Văn Trỗi" },
                ];
                addOptionsToDropdown(dealerslist1);
            } else if (selectedRadio.value === "R 18 B" || selectedRadio.value === "R nineT Scrambler" || selectedRadio.value === "S 1000 R") {
                // Update dropdown options based on Option 2
                const dealerslist2 = [
					{ text: "- CHỌN ĐỊA ĐIỂM LÁI THỬ -", value: "" },
                    { text: "BMW Motorrad Sala", value: "BMW Motorrad Sala" },
                    { text: "BMW Motorrad Nguyễn Văn Trỗi", value: "BMW Motorrad Nguyễn Văn Trỗi" },
                ];
                addOptionsToDropdown(dealerslist2);
            }
        }

        function addOptionsToDropdown(items) {
            const dealers = document.getElementById("selected-dealer");
            items.forEach(item => {
                const option = document.createElement("option");
                option.text = item.text;
                option.value = item.value;
                dealers.add(option);
            });
        }
		
		//selected-dealer
		$('#selected-dealer').on('change', function() {
			var value = this.value;
			$(".summaryData").removeClass("active");
			$(".summaryInfo").removeClass("active");

			if(value == "BMW Motorrad Long Biên"){
				$("#summaryData1").addClass("active");
				$("#summaryInfo").addClass("active");
			}else if(value == "BMW Motorrad Đà Nẵng"){
				$("#summaryData2").addClass("active");
				$("#summaryInfo").addClass("active");
			}else if(value == "BMW Motorrad Sala"){
				$("#summaryData3").addClass("active");
				$("#summaryInfo").addClass("active");
			}else if(value == "BMW Motorrad Nguyễn Văn Trỗi"){
				$("#summaryData4").addClass("active");
				$("#summaryInfo").addClass("active");
			}else if(value == ""){
				$(".summaryData").removeClass("active");
				$(".summaryInfo").removeClass("active");
			}
		   
		});
		
		//active col
		$('input[type=radio][name=Contact_Model]').change(function() {
			$(".margin-left").removeClass("col-hidden");

		});


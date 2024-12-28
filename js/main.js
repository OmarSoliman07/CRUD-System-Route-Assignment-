var inputname = document.getElementById("inputName");
var inputulr = document.getElementById("inputId");
var productlist = [];

if (localStorage.getItem("product") != null) {
    productlist = JSON.parse(localStorage.getItem("product"));
    display();
}
    
function product() {
    if (inputname.value[0] === inputname.value[0].toLowerCase()) {
        inputname.value = inputname.value[0].toUpperCase() + inputname.value.slice(1);
    }
    var add = {

        name: inputname.value,
        
        ulr: fixUrl(inputulr.value)
    };
   
    
    productlist.push(add);
    console.log(productlist);
    
    localStorage.setItem("product", JSON.stringify(productlist));
    display();
    clear();
}

function clear() {
    inputname.value = null;
    inputulr.value = null;
}


function display() {
    var contain = "";
    for (var i = 0; i < productlist.length; i++) {
        contain += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${productlist[i].name}</td>
            <td>
                <button class="btn bg-black">
                    <a href="${productlist[i].ulr}" target="_blank"><i class="fa-solid fa-eye"></i>Visit</a>
                </button>
            </td>
            <td>
                <button onclick="deleteproduct(${i})" class="btn bg-danger"><i class="fa-solid fa-trash"></i>Delete</button>
            </td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = contain;
}

function deleteproduct(index) {
    productlist.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productlist));
    display();
}

inputname.addEventListener("keyup", function () {
    validateName();
});

inputulr.addEventListener("blur", function () {
    validateUrl();
    
    
});


function validateName() {
    
    var reg = /^[a-z]{3,7}$/;
    if (reg.test(inputname.value)) {
        if (inputname.classList.contains("is-invalid")) {
            inputname.classList.remove("is-invalid");
        }
        inputname.classList.add("is-valid");
    } else {
        if (inputname.classList.contains("is-valid")) {
            inputname.classList.remove("is-valid");
        }
        inputname.classList.add("is-invalid");
    }
}

function validateUrl() {
    var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (urlRegex.test(inputulr.value)) {

        if (inputulr.classList.contains("is-invalid")) {
            inputulr.classList.remove("is-invalid");
        }
        inputulr.classList.add("is-valid");
    } else {
        sweet()
        if (inputulr.classList.contains("is-valid")) {
            inputulr.classList.remove("is-valid");
        }
        inputulr.classList.add("is-invalid");
        // Swal.fire({
        //     title: "Sweet!",
        //     text: "Modal with a custom image.",
        //     imageUrl: "https://unsplash.it/400/200",
        //     imageWidth: 400,
        //     imageHeight: 200,
        //     imageAlt: "Custom image"
        //   });
    }


    // var fixedUrl = fixUrl(inputulr.value);
    // if (isValidHttpUrl(fixedUrl)) {
    //     if (inputulr.classList.contains("is-invalid")) {
    //         inputulr.classList.remove("is-invalid");
    //     }
    //     inputulr.classList.add("is-valid");
    // } else {
    //     if (inputulr.classList.contains("is-valid")) {
    //         inputulr.classList.remove("is-valid");
    //     }
    //     inputulr.classList.add("is-invalid");
    // }
    
}

function isValidHttpUrl(string) {
    try {
        var url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

function fixUrl(string) {
    if (!string.startsWith("http://") && !string.startsWith("https://")) {
        return "https://" + string;
    }
    return string;
}
// inputulr.addEventListener("cancel",function(){
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: "btn btn-success",
//           cancelButton: "btn btn-danger"
//         },
//         buttonsStyling: false
//       });
//       swalWithBootstrapButtons.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true
//       }).then((result) => {
//         if (result.isConfirmed) {
//           swalWithBootstrapButtons.fire({
//             title: "Deleted!",
//             text: "Your file has been deleted.",
//             icon: "success"
//           });
//         } else if (
//           /* Read more about handling dismissals below */
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire({
//             title: "Cancelled",
//             text: "Your imaginary file is safe :)",
//             icon: "error"
//           });
//         }
//       });
// })
function sweet() {
    var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    if (!urlRegex.test(inputulr.value)) {
        Swal.fire({
            title: "Invalid URL!",
            text: "Please enter a valid URL.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
}



//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */

export default function	setDropdownListener(id){
        var dropdown = document.getElementById(id);    
        dropdown.addEventListener("click", function() {
        this.classList.toggle("active");
        this.classList.toggle("rotated");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
        });
 }



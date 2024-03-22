const Insertbtn = document.querySelector(".insert-btn");
const Deletebtn = document.querySelector(".delete-btn");
// const Updatebtn=document.querySelector(".update-btn");
// const url=new URL(window.location.href);
//         const pathname=url.pathname;
//         const pathParts=pathname.split("/");
//         const id=pathParts[pathParts.length-1];

document.addEventListener("DOMContentLoaded", function () {
  const updateButtons = document.querySelectorAll(".update-btn");

  updateButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("rid");

      const todoItem = button.closest(".content-box");
      const todoId = todoItem.dataset.tid;
      window.location.href = `http://localhost:3000/update/${id}/${todoId}`;
      console.log("Update button clicked");
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // const updateButtons = document.querySelectorAll(".update-btn");
  const Deletebtn = document.querySelectorAll(".delete-btn");

  Deletebtn.forEach((button) => {
    button.addEventListener("click", async function (event) {
      event.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("rid");

      const todoItem = button.closest(".content-box");
      const todoId = todoItem.dataset.tid;

      try {
        const response = await fetch(`/api/v1/delete/${todoId}`, {
          method: "DELETE",
        });
        alert("Data Deleted Successfully");
        window.location.href = `http://localhost:3000/getData?rid=${id}`;
      } catch (err) {
        console.log(err.message);
      }
      
    });
  });
});


Insertbtn.addEventListener("click", (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("rid");
  window.location.href = `http://localhost:3000/create/${id}`;
});

// Deletebtn.addEventListener("click", async () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   // const id = urlParams.get('rid');
//   const id = -NshsPlAt0NiAUuXdDMc;
//   try {
//     const response = await fetch(`/api/v1/delete/${id}`, {
//       method: "DELETE",
//     });
//     alert("Data Deleted Successfully");
//     window.location.href = `http://localhost:3000/getData?rid=${id}`;
//   } catch (err) {
//     console.log(err.message);
//   }
// });

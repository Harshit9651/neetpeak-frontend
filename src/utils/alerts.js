import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Logout confirmation
export const confirmLogout = (navigate) => {
  MySwal.fire({
    html: `<div class="tw-font-bold">Are you sure you want to logout?</div>`,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "var(--primary)",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/login");
    }
  });
};

// Success message
export const showSuccess = (message) => {
  MySwal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    confirmButtonColor: "var(--primary)"
  });
};

// Error message
export const showError = (message) => {
  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    confirmButtonColor: "var(--primary)"
  });
};

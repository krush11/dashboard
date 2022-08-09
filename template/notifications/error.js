import { showNotification } from '@mantine/notifications';

export default function showErrorNotification (title, message, opts) {
  let errorTitle = title || 'Error';
  let errorMessage = message || 'Something went wrong. If issue persists, please contact our support team';
  let autoCloseTime = opts && opts.autoClose || 7000;

  showNotification({
    title: errorTitle,
    message: errorMessage,
    autoClose: autoCloseTime,
    styles: theme => ({
      root: {
        backgroundColor: theme.colors.red,
        borderColor: theme.colors.red,
        '&::before': { backgroundColor: theme.white },
      },
      title: { color: theme.white, fontWeight: 900 },
      description: { color: theme.colors.gray[4] },
      closeButton: {
        color: theme.white,
        '&:hover': { backgroundColor: theme.colors.blue[7] }
      }
    })
  });
}
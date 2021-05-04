export const openModal = (title, message, type) => ({
    type: 'OPEN_MODAL',
    data: {
        open: true,
        title,
        message,
        type
    }
});

export const closeModal = () => ({
    type: 'OPEN_MODAL'
});
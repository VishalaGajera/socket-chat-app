export const unreadNotificationsFunc = (notifications) => {
    return notifications && notifications?.filter((n) => n.isRead === false)
}
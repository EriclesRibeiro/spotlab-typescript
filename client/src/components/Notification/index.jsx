import React from "react";
import "./index.css";
import { TbCircleCheck } from "react-icons/tb";
import { FiAlertTriangle } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { CgInfo } from "react-icons/cg";
import { useEffect } from "react";
import { useCallback } from "react";

export default function Notification({  listNotifications, setList  }) {

  const deleteNotification = useCallback(id => {
    const notificationItem = listNotifications.filter(e => e.id !== id)
      setList(notificationItem)
  }, [listNotifications, setList])

  useEffect(() => {
    const interval = setInterval(() => {
      if (listNotifications.length) {
        deleteNotification(listNotifications[0].id)
      }
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [listNotifications, deleteNotification])
  return (
    <div className="container-notification">
      {
        listNotifications.map((notification, index) => (
          <div className={`notification-item ${notification.type}`} key={index}>
            <div className="status-icon">
              {notification.type === "success" ? <TbCircleCheck /> : ""}
              {notification.type === "alert" ? <FiAlertTriangle /> : ""}
              {notification.type === "error" ? <VscError /> : ""}
              {notification.type === "info" ? <CgInfo /> : ""}
            </div>
            <div className="body">
              {notification.title && <div className="body-top">
                <h5 className="notification-title">{notification.title}</h5>
              </div>}
              <div className="body-bottom">
                <p>{notification.message}</p>
              </div>
            </div>
            <div className="close">
              <button className="close-notification" onClick={() => {deleteNotification(notification.id)}}>x</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

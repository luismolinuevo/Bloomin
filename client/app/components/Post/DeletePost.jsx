"use client"

import React from 'react'
import Modal from '../General/Modal'
import { deletePost } from '@/app/lib/post'

export default function DeletePost({onClose, isVisable, post_id, token}) {
    const handleDelete = async () => {
        try {
            const postdelete = await deletePost(post_id, token);
            if(postdelete.success) {
                //have toast are something
            } else {

            }
            onClose();
        } catch(error) {
            console.log("There ha been a error deleting post")
        }
    }
  return (
    <div>
        <Modal onClose={onClose} isVisable={isVisable}>
            <div>
                <h1>Are you sure you want to delete post?</h1>
                <div>
                    <button>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

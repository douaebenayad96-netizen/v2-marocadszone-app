import DefaultAxios, { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import emailjs from "@emailjs/browser"

import axios from '../config/axiosConfig'
import { QueryKeys } from '../../utils/QueryKeys'
import { ContactMessage, Conversation } from '../types/chat'

// fetch conversation details by id prestataire
async function fetchConversationDetailsByIdPrestataire({ idPrestataire, token }: { idPrestataire: number, token: string }) {
  try {
    const { data } = await axios.get(`/fetchConversation/${idPrestataire}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    },
    )
    return data.conversation as Conversation
  } catch (error) {
    if (DefaultAxios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      // check if error is 404 not found, return empty array; otherwise, throw an error
      if (axiosError.response?.status === 404) {
        return null
      } else {
        throw new Error(error.message)
      }
    } else {
      throw error
    }
  }
}

/**
 * Fetch conversation details by id prestataire
 * @param idPrestataire
 * @param token
 * @returns useQuery
  */
export function useFetchConversationDetailsByIdPrestataire(idPrestataire: number, token: string, enabled = true) {
  return useQuery([QueryKeys.CONVERSATION_DETAILS + idPrestataire + token, idPrestataire],
    () => fetchConversationDetailsByIdPrestataire({ idPrestataire, token }),
    {
      enabled
    }
  )
}

// /send-message/:idPrestataire (POST) 
async function sendMessage({ idPrestataire, token, message }: { idPrestataire: number, token: string, message: string }) {
  const { data } = await axios.post(`/send-message/${idPrestataire}`, { content: message }, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return data
}

/**
 * Send message
 * @param idPrestataire
 * @param token
 * @returns useMutation
  */
export function useSendMessage(idPrestataire: number, token: string) {
  return useMutation((message: string) => sendMessage({ idPrestataire, token, message }))
}

// fetch all user conversations list /conversations (GET)
async function fetchConversationsList({ token }: { token: string }) {
  const { data } = await axios.get('/conversations', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
  return data.conversations as Conversation[]
}

/**
 * Fetch all user conversations list
 * @param token // user token
 * @param enabled // default true (enabled)
 * @returns useQuery
  */
export function useFetchConversationsList(token: string, enabled = true) {
  return useQuery([QueryKeys.CONVERSATIONS_LIST + token],
    () => fetchConversationsList({ token }),
    {
      enabled: enabled
    }
  )
}

// /contact-message (POST) contact form
async function contactMessage(templateParams: ContactMessage) {
  const response = await emailjs.send(
    import.meta.env.VITE_SERVICE_ID || "",
    import.meta.env.VITE_TEMPLATE_ID || "",
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
  )
  return response.status
}

/**
 * Contact message
 * @param message
 * @returns useMutation
  */
export function useContactMessage() {
  return useMutation((message: ContactMessage) => contactMessage(message))
}
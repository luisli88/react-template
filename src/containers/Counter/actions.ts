import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { DEFAULT_SET_ACTION, DEFAULT_FETCH_ACTION } from './constants'

export const setIdAction = createAction<number>(DEFAULT_SET_ACTION)

export const fetchIdAction = createAsyncThunk(DEFAULT_FETCH_ACTION, async (time: number) => {
  const id: number = await new Promise((resolve) => setTimeout(resolve, time, 20))
  return id
})

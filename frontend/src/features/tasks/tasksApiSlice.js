/* eslint-disable no-unused-vars */
import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const tasksAdapter = createEntityAdapter({});

const initialState = tasksAdapter.getInitialState();

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => '/getalltasks',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedtasks = responseData.map(task => {
                    task.id = task._id
                    return task
                });
                return tasksAdapter.setAll(initialState, loadedtasks)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type:'task', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'task', id }))
                    ]
                } else return [{ type: 'task', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetTasksQuery,
} = tasksApiSlice

// returns the query result object
export const selecttasksResult = tasksApiSlice.endpoints.getTasks.select()

// creates memoized selector
const selectTasksData = createSelector(
    selecttasksResult,
    tasksResult => tasksResult.data //normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds 
    // Pass a selector that returns the tasks slice state
} = tasksAdapter.getSelectors(state => selectTasksData(state) ?? initialState)
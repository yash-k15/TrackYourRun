import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {

    const Context = React.createContext();

    const Provider = ({children}) => {
        const [ state, dispatch ] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for(let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
             
            //Context.Provider is the actual underline component that makes all of our data available to all the components underneath it i.e {Children}
            // value Prop is the actual information that get shared with all of our child component
            <Context.Provider value={{state, ...boundActions}}>
                {children}
            </Context.Provider>
        );
    }

    // Provider is the component that is going to make our data available to everything else in our app
    // Context is the context object that we are going to use to get access to that information from one of our child component
    return { Context, Provider };
}
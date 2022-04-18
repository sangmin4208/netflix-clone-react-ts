import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import App from './App'
import "./index.css"
import { theme } from './theme'

const client = new QueryClient()

const GlobalStyle = createGlobalStyle`
body{
  color: ${props => props.theme.white.darker};
}
`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </ThemeProvider>

  </React.StrictMode>
)

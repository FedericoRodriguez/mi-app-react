import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SelectedUserProvider } from '../contexts/SelectedUserContext'

// Custom render function that includes providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        <SelectedUserProvider>{children}</SelectedUserProvider>
      </BrowserRouter>
    ),
    ...options,
  })
}

// Re-export everything from testing-library
export * from '@testing-library/react'

// Override render method
export { customRender as render }

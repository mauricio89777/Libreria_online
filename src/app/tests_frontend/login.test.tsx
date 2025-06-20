import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/auth-context'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ReactNode } from 'react'
import Login from '../login/page'

// ... existing code ... 
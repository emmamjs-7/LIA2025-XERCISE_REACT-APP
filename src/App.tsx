import { Routes, Route } from 'react-router-dom'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'
import { Home } from './pages/Home'
import { CalendarPage } from './pages/Calendar'
import { Workout } from './pages/Workout'
import { Search } from './pages/Search'
import { History } from './pages/History'
import { Settings } from './pages/Settings'
import { Day } from './pages/Day'
import { ProtectedRoute } from './shared/utils/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <div className="flex flex-col min-h-dvh">
                <Header />

                <main className="App-header flex-col-1 gap-y-8 pb-24 pt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/calendar"
                            element={
                                <ProtectedRoute>
                                    <CalendarPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/workout"
                            element={
                                <ProtectedRoute>
                                    <Workout />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/history"
                            element={
                                <ProtectedRoute>
                                    <History />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <ProtectedRoute>
                                    <Search />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/day/:weekday/:date"
                            element={
                                <ProtectedRoute>
                                    <Day />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default App

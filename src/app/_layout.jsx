import { Slot } from 'expo-router';
import { UserProvider } from './contexts/user/UserContext';
import { InstructorProvider } from './contexts/instructor/InstructorContext';
import { OwnerProvider } from './contexts/owner/OwnerContext';
import { StoreProvider } from './contexts/store/StoreContext';

const HomeLayout = () => {
    return (
        <>
            <OwnerProvider>
                <InstructorProvider>
                    <StoreProvider>
                        <UserProvider>
                            <Slot />
                        </UserProvider>
                    </StoreProvider>
                </InstructorProvider>
            </OwnerProvider>

        </>
    );
}

export default HomeLayout;

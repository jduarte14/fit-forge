import { Slot } from 'expo-router';
import { UserProvider } from './contexts/user/UserContext';
import { InstructorProvider } from './contexts/instructor/InstructorContext';
import { OwnerProvider } from './contexts/owner/OwnerContext';

const HomeLayout = () => {
    return (
        <>
            <OwnerProvider>
                <InstructorProvider>
                    <UserProvider>
                        <Slot />
                    </UserProvider>
                </InstructorProvider>
            </OwnerProvider>

        </>
    );
}

export default HomeLayout;

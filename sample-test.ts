// Sample TypeScript file with console logs for testing
interface User {
    id: number;
    name: string;
    email: string;
}

class UserService {
    private users: User[] = [];

    constructor() {
        console.log('UserService initialized');
    }

    addUser(user: User): void {
        console.log('Adding user:', user);
        this.users.push(user);
        console.info('User added successfully');
    }

    getUser(id: number): User | undefined {
        console.log('Getting user with id:', id);
        const user = this.users.find(u => u.id === id);

        if (!user) {
            console.warn('User not found with id:', id);
            return undefined;
        }

        console.debug('Found user:', user);
        return user;
    }

    getAllUsers(): User[] {
        console.log('Getting all users');
        console.info(`Total users: ${this.users.length}`);
        return this.users;
    }

    removeUser(id: number): boolean {
        console.log('Removing user with id:', id);
        const index = this.users.findIndex(u => u.id === id);

        if (index === -1) {
            console.error('User not found for removal:', id);
            return false;
        }

        this.users.splice(index, 1);
        console.info('User removed successfully');
        return true;
    }
}

// Usage example
const userService = new UserService();

const user1: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
const user2: User = { id: 2, name: 'Jane Smith', email: 'jane@example.com' };

userService.addUser(user1);
userService.addUser(user2);

console.log('All users:', userService.getAllUsers());

export { UserService, User }; 
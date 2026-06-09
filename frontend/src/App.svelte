<script lang="ts">
  import { onMount } from 'svelte';
  import { socket } from './lib/socket';
  import './app.css';

  type Message = {
    id: number;
    author: string;
    content: string;
    likes: number;
    created_at: string;
  };

  let messages = $state<Message[]>([]);
  let newAuthor = $state('');
  let newContent = $state('');

  onMount(async () => {
    // Fetch initial messages
    try {
      const res = await fetch('http://localhost:4000/api/messages');
      if (res.ok) {
        messages = await res.json();
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }

    // Listen for new messages
    socket.on('message_added', (msg: Message) => {
      messages = [msg, ...messages];
    });

    // Listen for likes
    socket.on('message_liked', (updatedMsg: Message) => {
      messages = messages.map(m => m.id === updatedMsg.id ? updatedMsg : m);
    });

    return () => {
      socket.off('message_added');
      socket.off('message_liked');
    };
  });

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!newContent.trim()) return;

    socket.emit('new_message', {
      author: newAuthor.trim() || 'Anonymous',
      content: newContent.trim()
    });

    newContent = '';
  }

  function handleLike(id: number) {
    socket.emit('like_message', id);
  }
</script>

<main>
  <header class="glass header">
    <h1>Pulse</h1>
    <p>Real-Time Feedback Hub</p>
  </header>

  <form class="glass form-container" onsubmit={handleSubmit}>
    <input 
      type="text" 
      class="input mb" 
      placeholder="Tu nombre (opcional)" 
      bind:value={newAuthor} 
    />
    <textarea 
      class="input mb" 
      placeholder="Escribe tu mensaje..." 
      rows="3" 
      bind:value={newContent}
      required
    ></textarea>
    <button type="submit" class="button">Publicar</button>
  </form>

  <div class="feed">
    {#each messages as msg (msg.id)}
      <article class="glass message-card">
        <div class="message-header">
          <strong>{msg.author}</strong>
          <span class="date">{new Date(msg.created_at).toLocaleString()}</span>
        </div>
        <p class="content">{msg.content}</p>
        <div class="actions">
          <button class="button like-btn" onclick={() => handleLike(msg.id)}>
            ❤️ {msg.likes}
          </button>
        </div>
      </article>
    {/each}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .header {
    text-align: center;
    padding: 1.5rem;
  }
  
  .header h1 {
    margin: 0;
    font-size: 2.5rem;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .header p {
    margin: 0.5rem 0 0;
    color: #94a3b8;
  }

  .form-container {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .mb {
    margin-bottom: 1rem;
  }

  textarea {
    resize: vertical;
  }

  .feed {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message-card {
    padding: 1.5rem;
    animation: fadeIn 0.3s ease-out;
  }

  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #cbd5e1;
  }

  .date {
    font-size: 0.8rem;
    color: #64748b;
  }

  .content {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    word-break: break-word;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .like-btn {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .like-btn:hover {
    background-color: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

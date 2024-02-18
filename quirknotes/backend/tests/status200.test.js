test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
    
    const allNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(allNotesBody.response.length).toBe(0);
  });

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");


    const deleteAllNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteAllNoteBody = await deleteAllNoteRes.json();
    expect(deleteAllNoteRes.status).toBe(200);
    expect(deleteAllNoteBody.response).toBe("1 note(s) deleted.");

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
});

  const allNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(allNotesBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");
    
    const title2 = "NoteTitleTest2";
    const content2 = "NoteTitleContent2";
  
    const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title2,
        content: content2,
      }),
    });
  
    const postNoteBody2 = await postNoteRes2.json();
  
    expect(postNoteRes2.status).toBe(200);
    expect(postNoteBody2.response).toBe("Note added succesfully.");

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
    
    const allNotesBody = await getAllNotesRes.json();

    expect(getAllNotesRes.status).toBe(200);
    expect(allNotesBody.response.length).toBe(2);

    const deleteAllNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const deleteAllNoteBody = await deleteAllNoteRes.json();
      expect(deleteAllNoteRes.status).toBe(200);
      expect(deleteAllNoteBody.response).toBe("2 note(s) deleted.");
  
    const getAllNotesRes2 = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
  });
  
    const allNotesBody2 = await getAllNotesRes2.json();
  
    expect(getAllNotesRes2.status).toBe(200);
    expect(allNotesBody2.response.length).toBe(0);
});

test("/deleteNote - Delete a note", async () => {
    const title = "NoteTitleTest3";
    const content = "NoteTitleContent3";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  
    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteNoteBody = await deleteNoteRes.json();
    // expect(deleteNoteBody.error).toBe("Invalid note ID.");
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toMatch(/Document with ID/);

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
    
      const allNotesBody = await getAllNotesRes.json();
    
      expect(getAllNotesRes.status).toBe(200);
      expect(allNotesBody.response.length).toBe(0);
});

test("/patchNote - Patch with content and title", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
  
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const postNoteBody = await postNoteRes.json();
  
    expect(postNoteRes.status).toBe(200);
    expect(postNoteBody.response).toBe("Note added succesfully.");

    const newtitle = "newNoteTitleTest";
    const newcontent = "newNoteTitleContent";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newtitle,
        content: newcontent,
      }),
    });

    const patchNoteBody = await patchNoteRes.json();
    
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);

    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
    
      const allNotesBody = await getAllNotesRes.json();
    
      expect(getAllNotesRes.status).toBe(200);
      expect(allNotesBody.response.length).toBe(1);
      expect(allNotesBody.response[0].title).toBe("newNoteTitleTest");
      expect(allNotesBody.response[0].content).toBe("newNoteTitleContent");

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    });
    const deleteNoteBody = await deleteNoteRes.json();
    // expect(deleteNoteBody.error).toBe("Invalid note ID.");
    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toMatch(/Document with ID/);

    const getAllNotesRes2 = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        }
    });
    
    const allNotesBody2 = await getAllNotesRes2.json();
    
    expect(getAllNotesRes2.status).toBe(200);
    expect(allNotesBody2.response.length).toBe(0);
});
import { client } from "../../lib/client";

export default async function tournamentRegistration(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, userId, userName } = req.body;
      console.log('name, userId, username are', name, userId, userName);

      const tournamentQuery = `*[_type == 'tournament' && name == "${name}"]`;
      const tournament = await client.fetch(tournamentQuery);

      if (!tournament || !tournament.length) {
        console.error('Tournament not found!');
        // Handle the case when the tournament is not found, display an error message, etc.
        return;
      }

      const isUserRegistered = (tournament[0].registeredStudent || []).some(
        (student) => student.CGSCA_id === userId
      );

      if (isUserRegistered) {
        console.log('Player already registered!');
        res.status(200).json({ message: 'Player already registered' });
        return;
      }

      const newRegisteredStudent = {
        CGSCA_id: userId,
        name: userName,
      };

      const updatedTournament = {
        ...tournament[0],
        registeredStudent: [
          ...(tournament[0].registeredStudent || []),
          newRegisteredStudent,
        ],
      };

      const updateQuery = tournament[0]._id;

      await client.patch(updateQuery).set(updatedTournament).commit();
      console.log('after patch and commit');
      res.status(200).json({ message: 'Player registered successfully' });
    } catch (error) {
      console.log('Error occurred inside post catch, error is', error);
      res.status(500).json({ message: error });
    }
  } else {
    console.log('This method is not allowed');
    res.status(405).json({ message: 'Method not allowed' });
  }
}
